"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * @description 해당 컴포넌트는 앱 전역 클라이언트 렌더링 중에 catch 되지 않은 에러 발생 시
 * next.js 에 의해 사용되는 특수 컴포넌트 입니다.
 * 직접 사용하지 마세요!
 */
export default function GlobalError({ error, reset }: Props) {
  const router = useRouter();

  useEffect(() => {
    // todo: sentry logging
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>알 수 없는 에러가 발생했습니다.</h2>
        <button onClick={() => reset()}>재 시도하기</button>
        <button onClick={() => router.replace("/board")}>
          메인으로 돌아가기
        </button>
      </body>
    </html>
  );
}
