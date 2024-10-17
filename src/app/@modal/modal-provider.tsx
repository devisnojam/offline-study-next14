"use client";

import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext } from "react";

type ProviderValue = {
  onCloseModal: () => void;
};

const ModalContext = createContext<ProviderValue | null>({
  onCloseModal: () => void 0,
});

export const useModalProvider = () => useContext(ModalContext)!;

export default function ModalProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
    // REVIEW: 클라이언트 route caching 무효화 테스트 - 동작확인함
    // 단, refresh 동작이 비동기이므로 해당 컴포넌트가 마운트 해제되기 전에 refresh 가 동작된다는 보장이 안됨!
    // 클라이언트에서 라우트 될때마다 서버에서 갱신된 데이터를 조회하려면 해당 컴포넌트가 최상단에 위치해야 될듯..하다
    // router.refresh();
  };

  const value = { onCloseModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
