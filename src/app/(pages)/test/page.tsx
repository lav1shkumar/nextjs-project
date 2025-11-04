"use client";
import { CallingState, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks, type User } from '@stream-io/video-react-sdk';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1RodW5kZXJfU2Fsc2EiLCJ1c2VyX2lkIjoiVGh1bmRlcl9TYWxzYSIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzYyMTczODAwLCJleHAiOjE3NjI3Nzg2MDB9.UdrDaV_HJC1xpIoCwZo6fOfIkVHXzQE8KQOtt-Qppdo';
const userId = 'Thunder_Salsa';
const callId = 'Cz2XZPlGMKCfq42SfMTj2';

// set up the user object
const user: User = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
await call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const call = useCall();

  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Call "{call?.id}" has {participantCount} participants
    </div>
  );
};