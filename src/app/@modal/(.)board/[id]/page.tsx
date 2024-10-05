interface Props {
  params: { id: string };
}

export default function ModalBoardDetail({ params }: Props) {
  return <div>{params.id}</div>;
}
