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
        <div className="mx-auto w-10/12 mycontainer flex-1">
          <h1 className='text-4xl font-bold text-center'>
            <span className='text-green-500'> &lt;</span> Pass
            <span className='text-green-500'>OP/ &gt;</span>
          </h1>
          <p className='text-green-900 text-center text-lg'>Your Own Password Manager</p>

          <div className="text-black flex flex-col p-4 gap-8 items-center">
            <input
              placeholder='Enter Website URL'
              className='rounded-full border border-green-500 w-full p-4 py-1'
              value={form.site}
              onChange={handleChange}
              type="text"
              name="site"
            />
            <div className="flex w-full gap-8 justify-between">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder='Enter Username'
                className='rounded-full border border-green-500 w-full p-4 py-1'
                type="text"
                name="username"
              />
              <div className="relative">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  placeholder='Enter Password'
                  className='rounded-full border border-green-500 w-full p-4 py-1'
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
              className='flex justify-center items-center bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-400 gap-2 border border-green-900'
            >
              <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
              {isEditing ? 'Update Password' : 'Add Password'}
            </button>
          </div>

          <div className="passwords">
            <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
            {passwordArray.length === 0 && <div>No Passwords to Show</div>}
            {passwordArray.length !== 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden">
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
                      <td className='py-2 border border-white text-center'>
                        <div className='justify-center items-center flex'>
                          <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                          <div className={`copy-icon p-1 ${copiedIndex === index ? 'copied' : ''}`} onClick={() => copyText(item.site, index)}>
                            <FiCopy size={24} />
                          </div>
                        </div>
                      </td>
                      <td className='py-2 border border-white text-center w-32'>
                        <div className='justify-center items-center flex'>
                          {item.username}
                          <div className={`copy-icon p-1 ${copiedIndex === index ? 'copied' : ''}`} onClick={() => copyText(item.username, index)}>
                            <FiCopy size={24} />
                          </div>
                        </div>
                      </td>
                      <td className='py-2 border border-white text-center w-32'>
                        <div className='justify-center items-center flex'>
                          {item.password}
                          <div className={`copy-icon p-1 ${copiedIndex === index ? 'copied' : ''}`} onClick={() => copyText(item.password, index)}>
                            <FiCopy size={24} />
                          </div>
                        </div>
                      </td>
                      <td className='py-2 border border-white text-center w-32'>
                        <div className="flex justify-center items-center gap-4">
                          <FiEdit className="cursor-pointer text-blue-500" onClick={() => editPassword(index)} />
                          <FiTrash className="cursor-pointer text-red-500" onClick={() => deletePassword(index)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
