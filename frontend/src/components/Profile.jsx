import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAppliedJob from '@/hooks/useGetAppliedJob'


// const skills = ["Html", "Css", "Javascript", "Reactjs"];
const isResume = true;

const Profile = () => {

    useGetAppliedJob();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);


    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>

                    <div className='flex
                    items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-medium'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-2 mt-2'>

                        {
                            user?.profile?.skills.length !== 0 ? (
                                user?.profile?.skills.map((item, index) => (
                                    <Badge
                                        className="px-3  text-sm font-medium rounded-full text-white 
                                        bg-gradient-to-r from-[#2a3b5f] via-[#36486b] to-[#45597a]
                                        shadow-md hover:shadow-blue-400/40 hover:scale-105 
                                        transform transition duration-300 cursor-default break-words"
                                        key={index}>{item}
                                    </Badge>
                                ))
                            ) : (
                                <span>NA</span>
                            )
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='text-lg font-bold my-5'>Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile