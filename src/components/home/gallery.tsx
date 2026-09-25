import { StackImage } from "../commons/stackimage";

export function Gallery() {
  return (
    <>
      <div className="hidden sm:flex relative w-full mx-auto max-w-3xl items-center min-h-52 not-lg:min-h-96 justify-center">
        <StackImage
          src="/images/debert_1.jpg"
          alt="Debert"
          initialRotation={-4}
          initialX={-150}
          initialY={15}
          baseZIndex={20}
        />
        <StackImage
          src="/images/debert_2.jpg"
          alt="Debert"
          initialRotation={8}
          initialX={150}
          initialY={15}
          baseZIndex={10}
          loading="eager"
        />
        <StackImage
          src="/images/debert_3.jpg"
          alt="Debert"
          initialRotation={0}
          initialX={0}
          initialY={-10}
          baseZIndex={20}
        />
      </div>
      <div className="flex sm:hidden relative w-full mx-auto max-w-3xl h-56 items-center justify-center">
        <StackImage
          src="/images/debert_1.jpg"
          alt="Debert"
          initialRotation={-4}
          initialX={-80}
          initialY={15}
          baseZIndex={20}
        />
        <StackImage
          src="/images/debert_2.jpg"
          alt="Debert"
          initialRotation={8}
          initialX={80}
          initialY={15}
          baseZIndex={10}
        />
        <StackImage
          src="/images/debert_3.jpg"
          alt="Debert"
          initialRotation={0}
          initialX={0}
          initialY={-10}
          baseZIndex={20}
        />
      </div>
    </>
  );
}
