export default function CircleLoader({ classNameOne, classNameTwo }) {
  return (
    <div className={`${classNameOne || "h-[350px]"} flex-center w-full`}>
      <div
        className={`${
          classNameTwo || "h-12 w-12"
        } animate-spin rounded-full border-b-2 border-secondary`}
      ></div>
    </div>
  );
}
