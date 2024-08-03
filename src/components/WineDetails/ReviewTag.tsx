const ReviewTag = ({ tag }: { tag: string }) => {
  return (
    <h3 className="flex flex-center rounded-100 p-[6px_10px] md:p-[8px_15px] border border-grayscale-300 border-solid">
      {tag}
    </h3>
  );
};

export default ReviewTag;
