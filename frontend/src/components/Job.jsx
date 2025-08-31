import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../redux/bookmarkSlice";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state) => state.bookmark);

  // Check if already bookmarked
  const bookmarked = savedJobs.some((j) => j._id === job._id);

  // Function for showing days ago
  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "Today";
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (days <= 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  return (
    <div className="p-5 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt)}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={() => dispatch(toggleBookmark(job))}
        >
          {bookmarked ? (
            <Bookmark className="text-purple-600 fill-purple-600" />
          ) : (
            <Bookmark className="text-gray-500" />
          )}
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12 border">
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title + Description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
        <Badge className="text-[#5799cf] font-bold" variant="ghost">
          {job?.experienceLevel} Years Exp.
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button
          onClick={() => dispatch(toggleBookmark(job))}
          className={`${
            bookmarked ? "bg-purple-700" : "bg-[#7209b7]"
          } text-white`}
        >
          {bookmarked ? "Saved" : "Save For Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
