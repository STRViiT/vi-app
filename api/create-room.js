import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { roomName, participantName } = req.body;
  const uniqueName = `${participantName}-${Date.now()}`;

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity: uniqueName }
  );

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  const token = await at.toJwt();

  res.status(200).json({
    token,
    url: process.env.LIVEKIT_URL,
  });
}