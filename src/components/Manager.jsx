import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FiCopy, FiEdit, FiTrash } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
  };

  const savePassword = () => {
    const updatedPasswords = isEditing
      ? passwordArray.map((item, index) => index === editingIndex ? form : item)
      : [...passwordArray, form];

    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setForm({ site: "", username: "", password: "" });
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text, index) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success('Copied to Clipboard!');
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1000);
      },
      (err) => {
        console.error('Failed to copy text: ', err);
        toast.error('Failed to copy text');
      }
    );
  };

  const deletePassword = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this password?");
    if (confirmed) {
      const updatedPasswords = passwordArray.filter((_, i) => i !== index);
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      toast.success('Password Deleted!');
    }
  };

  const editPassword = (index) => {
    setForm(passwordArray[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="absolute inset-0 -z-50 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="flex flex-col min-h-screen bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <div className="flex flex-col justify-center items-center mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 my-8 flex-1">
          <h1 className='text-4xl font-bold text-center'>
            <span className='text-green-500'> &lt;</span> Pass
            <span className='text-green-500'>OP/ &gt;</span>
          </h1>
          <p className='text-green-900 text-center text-lg mb-8'>Your Own Password Manager</p>

          <div className="text-black flex flex-col gap-8 w-full">
            <input
              placeholder='Enter Website URL'
              className='rounded-full border border-green-500 w-full p-4 py-1 text-center'
              value={form.site}
              onChange={handleChange}
              type="text"
              name="site"
            />
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder='Enter Username'
                className='rounded-full border border-green-500 w-full p-4 py-1 text-center'
                type="text"
                name="username"
              />
              <div className="relative w-full">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  placeholder='Enter Password'
                  className='rounded-full border border-green-500 w-full p-4 py-1 text-center'
                  type="password"
                  name="password"
                />
                <span className='absolute right-2 top-2' onClick={showPassword}>
                  <img className='px-0.5 my-auto cursor-pointer' width={20} src="icons8-eye.gif" alt="eye" />
                </span>
              </div>
            </div>

            <button
              onClick={savePassword}
              className='flex justify-center items-center bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-400 gap-2 border border-green-900 mx-auto'
            >
              <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
              {isEditing ? 'Update Password' : 'Add Password'}
            </button>
          </div>

          <div className="passwords mt-8 w-full">
            <h2 className='font-bold text-2xl py-4 text-center'>Your Passwords</h2>
            {passwordArray.length === 0 && <div className="text-center">No Passwords to Show</div>}
            {passwordArray.length !== 0 && (
              <div className="overflow-x-auto">
                <table className="table-auto w-full rounded-md overflow-hidden text-center">
                  <thead className='bg-slate-800 text-white'>
                    <tr>
                      <th className='py-2'>Site</th>
                      <th className='py-2'>Username</th>
                      <th className='py-2'>Password</th>
                      <th className='py-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='bg-violet-200'>
                    {passwordArray.map((item, index) => (
                      <tr key={index}>
                        <td className='py-2 border border-white'>
                          <div className='flex justify-center items-center'>
                            <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                            <div className={`copy-icon p-1 ${copiedIndex === index ? 'copied' : ''}`} onClick={() => copyText(item.site, index)}>
                              <FiCopy size={24} />
                            </div>
                          </div>
                        </td>
                        <td className='py-2 border border-white'>
                          <div className='flex justify-center items-center'>
                            {item.username}
                            <div className={`copy-icon p-1 ${copiedIndex === index ? 'copied' : ''}`} onClick={() => copyText(item.username, index)}>
                              <FiCopy size={24} />
                            </div>
                          </div>
                        </td>
                        <td className='py-2 border border-white'>
                          <div className='flex justify-center items-center'>
                            {item.password}
                            <div className={`copy-icon p-1 ${copiedIndex === index ? 'copied' : ''}`} onClick={() => copyText(item.password, index)}>
                              <FiCopy size={24} />
                            </div>
                          </div>
                        </td>
                        <td className='py-2 border border-white'>
                          <div className="flex justify-center items-center gap-4">
                            <FiEdit className="cursor-pointer text-blue-500" onClick={() => editPassword(index)} />
                            <FiTrash className="cursor-pointer text-red-500" onClick={() => deletePassword(index)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
