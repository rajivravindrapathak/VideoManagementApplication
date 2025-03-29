import ReactPlayer from "react-player";

const VideoCard = ({ video }) => {
  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="text-lg">{video.title}</h3>
      <p className="text-sm">{video.description}</p>
      <ReactPlayer url={`http://localhost:5000/${video.filePath}`} controls width="100%" height="200px" />
    </div>
  );
};

export default VideoCard;
