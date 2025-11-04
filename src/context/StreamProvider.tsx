// app/providers.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import {
  StreamVideo,
  StreamVideoClient,
  type User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

export default function StreamVideoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  const user: User | undefined = useMemo(() => {
    const u = session?.user as any;
    if (!u?.id && !u?._id) return undefined;
    return {
      id: (u.id ?? u._id) as string,
      name: u.username ?? u.name ?? "User",
    };
  }, [session?.user]);

  useEffect(() => {
    if (status !== "authenticated" || !user) return;
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

    const tokenProvider = async () => {
      const res = await fetch("/api/stream/token");
      const { token } = await res.json();
      return token as string;
    };

    const c = new StreamVideoClient({ apiKey, user, tokenProvider });
    setClient(c);

    return () => {
      void c.disconnectUser();
    };
  }, [status, user]);

  if (status === "loading" || !user || !client) return null;

  return <StreamVideo client={client}>{children}</StreamVideo>;
}
