import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Loader2, PlayCircle, Video } from 'lucide-react';
import api from '../lib/api';
import PageContainer from '../components/PageContainer.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const JITSI_DOMAIN = 'meet.jit.si';

function loadJitsiScript() {
  return new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) return resolve();
    const script = document.createElement('script');
    script.src = `https://${JITSI_DOMAIN}/external_api.js`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Could not load video meeting'));
    document.body.appendChild(script);
  });
}

export default function LessonRoom() {
  const { id } = useParams();
  const { user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recordingUrl, setRecordingUrl] = useState('');
  const [joined, setJoined] = useState(false);
  const containerRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    api
      .get(`/lessons/${id}`)
      .then((res) => setLesson(res.data.lesson))
      .catch(() => toast.error('Could not load lesson'))
      .finally(() => setLoading(false));

    api
      .get(`/recordings/${id}`)
      .then((res) => setRecordingUrl(res.data.url))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const startMeeting = async () => {
    if (!lesson || !containerRef.current) return;
    try {
      await loadJitsiScript();
      const apiObj = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, {
        roomName: lesson.meetingRoom || `edumeet-${lesson._id}`,
        parentNode: containerRef.current,
        width: '100%',
        height: 600,
        userInfo: { displayName: user?.name || 'Guest' },
        configOverwrite: {
          startWithAudioMuted: false,
          prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
          DEFAULT_BACKGROUND: '#0b0f19',
          DISABLE_VIDEO_BACKGROUND: false,
        },
      });
      apiRef.current = apiObj;
      apiObj.addListener('readyToClose', () => {
        apiObj.dispose();
        apiRef.current = null;
        setJoined(false);
      });
      setJoined(true);
    } catch (err) {
      toast.error(err.message || 'Could not start meeting');
    }
  };

  useEffect(() => {
    return () => {
      if (apiRef.current) apiRef.current.dispose();
    };
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <div className="grid place-items-center py-20"><Loader2 className="w-6 h-6 animate-spin" /></div>
      </PageContainer>
    );
  }

  if (!lesson) {
    return (
      <PageContainer>
        <p className="text-white/70">Lesson not found.</p>
      </PageContainer>
    );
  }

  const isStudent = lesson.student?._id === user?._id;
  const isTutor = lesson.tutor?._id === user?._id;
  const canJoin = (isStudent || isTutor) && ['paid', 'completed'].includes(lesson.status);

  return (
    <PageContainer>
      <Link to="/dashboard" className="text-sm text-white/60 hover:text-white inline-flex items-center gap-1 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="card p-6 mb-6">
        <h1 className="font-display text-3xl font-bold">{lesson.title}</h1>
        <p className="text-white/60 mt-1">
          {lesson.subject} • with {lesson.tutor?.name}
        </p>
      </div>

      {canJoin ? (
        <>
          {!joined && (
            <div className="card p-10 text-center">
              <Video className="w-12 h-12 mx-auto text-brand-300" />
              <h2 className="font-display text-2xl font-bold mt-3">Ready to join?</h2>
              <p className="text-white/60 mt-1">Your private classroom is waiting.</p>
              <button onClick={startMeeting} className="btn-primary mt-6">
                <Video className="w-4 h-4" /> Enter classroom
              </button>
            </div>
          )}
          <div ref={containerRef} className="rounded-2xl overflow-hidden mt-4 bg-black" />
        </>
      ) : (
        <div className="card p-8 text-center text-white/70">
          {lesson.status === 'booked'
            ? 'Waiting for payment to complete before the classroom unlocks.'
            : 'This lesson is not active.'}
        </div>
      )}

      {recordingUrl && (
        <div className="card p-6 mt-6">
          <h2 className="font-display text-xl font-bold flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-brand-300" /> Lesson recording
          </h2>
          <video
            src={`${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')}${recordingUrl}`}
            controls
            className="mt-3 w-full rounded-xl bg-black"
          />
        </div>
      )}
    </PageContainer>
  );
}
