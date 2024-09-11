import "./boxTitle.css";

// Correctly typing the prop to be a string
interface BoxTitleProps {
  Title: string;
}

export const Boxtitle: React.FC<BoxTitleProps> = ({ Title }) => {
  return (
    <div>
      <h3 className="title">{Title}</h3>
    </div>
  );
};
