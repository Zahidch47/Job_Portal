import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const JobDescription = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth)

    const isInitiallyApplied =
        singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJobs();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
            <Button onClick={() => navigate("/browse")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                <ArrowLeft />
                <span>Back</span>
            </Button>
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        <Badge className="text-blue-700 font-bold" variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`w-full sm:w-auto rounded-lg ${isApplied
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-[#7209b7] hover:bg-[#5f32ad]'
                        }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Job Description */}
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">
                Job Description
            </h1>

            <div className="my-4 space-y-2 text-sm sm:text-base">
                <h1 className="font-bold">
                    Role: <span className="pl-2 font-normal text-gray-800">{singleJob?.title}</span>
                </h1>
                <h1 className="font-bold">
                    Location:{' '}
                    <span className="pl-2 font-normal text-gray-800">{singleJob?.location}</span>
                </h1>
                <h1 className="font-bold">
                    Description:{' '}
                    <span className="pl-2 font-normal text-gray-800">{singleJob?.description}</span>
                </h1>
                <h1 className="font-bold">
                    Experience:{' '}
                    <span className="pl-2 font-normal text-gray-800">{singleJob?.experienceLevel} yrs</span>
                </h1>
                <h1 className="font-bold">
                    Salary:{' '}
                    <span className="pl-2 font-normal text-gray-800">{singleJob?.salary} LPA</span>
                </h1>
                <h1 className="font-bold">
                    Total Application:{' '}
                    <span className="pl-2 font-normal text-gray-800">
                        {singleJob?.applications?.length}
                    </span>
                </h1>
                <h1 className="font-bold">
                    Posted Date:{' '}
                    <span className="pl-2 font-normal text-gray-800">
                        {singleJob?.createdAt?.split('T')[0]}
                    </span>
                </h1>
            </div>
        </div>
    );
};

export default JobDescription;
