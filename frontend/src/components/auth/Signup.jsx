import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '../../utils/constant.js'
import store from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        <form 
          onSubmit={submitHandler} 
          className="
            w-full 
            max-w-md 
            lg:max-w-2xl lg:w-1/2 
            bg-white shadow-xl rounded-2xl p-6 sm:p-8"
        >
          <h1 className="font-bold text-2xl mb-5 text-center text-gray-800">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Sign up to explore jobs & opportunities 🚀
          </p>

          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Subhendu Mandal"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="mandalsubhendu243@gmail.com"
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="+91 98XXXXX92"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Password"
              />
            </div>

            {/* Role + Profile Upload */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Input 
                    type="radio" 
                    name="role" 
                    value="student" 
                    checked={input.role === "student"} 
                    onChange={changeEventHandler}
                  />
                  Student
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Input 
                    type="radio" 
                    name="role" 
                    value="recruiter" 
                    checked={input.role === "recruiter"} 
                    onChange={changeEventHandler}
                  />
                  Recruiter
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input 
                  accept="image/*" 
                  type="file" 
                  onChange={changeFileHandler} 
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Button */}
          {
            loading ? (
              <Button className="w-full my-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="w-full my-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90"
              >
                Signup
              </Button>
            )
          }

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Signup
