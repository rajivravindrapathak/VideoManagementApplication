import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setVideos, setLoading } from "../redux/videoSlice";
import VideoCard from "../components/VideoCard";

const Dashboard = () => {
  const { videos, loading } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/videos", { headers: { Authorization: `Bearer ${token}` } });
      dispatch(setVideos(data));
      dispatch(setLoading(false));
    };
    fetchVideos();
  }, [dispatch]);

  return (
    <div className="p-5">
      <h2 className="text-xl mb-4">My Videos</h2>
      {loading ? <p>Loading...</p> : videos.map((video) => <VideoCard key={video._id} video={video} />)}
    </div>
  );
};

export default Dashboard;
