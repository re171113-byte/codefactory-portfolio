import { useEffect, useRef } from "react";

/**
 * useInterval 훅 - setInterval의 React 친화적 버전
 * @param callback 실행할 콜백 함수
 * @param delay 간격 (ms), null이면 일시정지
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback);

  // 최신 콜백 저장
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 인터벌 설정
  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
