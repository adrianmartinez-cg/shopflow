interface TagsChipsProps {
  tags: string;
}

const TagsChips = ({ tags }: TagsChipsProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-3">
      {tags.split(",").map((tag) => (
        <div key={tag} className="bg-blue-200 p-3 rounded-md">
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TagsChips;
