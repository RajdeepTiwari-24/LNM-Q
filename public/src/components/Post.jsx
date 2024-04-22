// import React, { useEffect, useState } from "react";
// import Logout from "./Logout";
// import axios from "axios";
// import { allPostsRoute, addPostRoute } from "../utils/APIRoutes";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../css/post.css";
// // import Spinner from "./Spinner";
// // import Sorting from "./Sorting";

// import { useSpring, animated } from "react-spring";
// import img1 from "../assets/img1.png";
// import img2 from "../assets/img2.png";
// import img3 from "../assets/img3.png";
// import { Dialog } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// const navigation = [
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];

// export default function Post() {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [reload, setReload] = useState(false);
//   const [currUsername, setCurrUsername] = useState(null);
//   const [currUserId, setCurrUserId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const GetPosts = async () => {
//       axios
//         .get(`${allPostsRoute}`)
//         .then((res) => {
//           const postData = Array.isArray(res.data) ? res.data.reverse() : [];
//           setTimeout(() => {
//             setPosts(postData);
//             setLoading(false);
//           }, 600);
//         })
//         .catch((e) => {
//           console.log(e);
//           setLoading(false);
//         });
//     };
//     GetPosts();
//   }, [reload]);

//   useEffect(() => {
//     if (localStorage.getItem("USER")) {
//       const username = JSON.parse(localStorage.getItem("USER")).username;
//       const userId = JSON.parse(localStorage.getItem("USER"))._id;
//       setCurrUsername(username);
//       setCurrUserId(userId);
//     }
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const text = event.target.elements.text.value;
//     const topic = event.target.elements.topic.value;
//     if (text.length < 1) {
//       alert("Empty");
//       return;
//     }
//     if (topic.length < 1) {
//       alert("Topic Required");
//       return;
//     }
//     const { data } = await axios.post(addPostRoute, {
//       text,
//       topic,
//       currusername: currUsername,
//       currUserId,
//     });
//     if (data.status === false) {
//       alert(data.msg);
//     }
//     if (data.status === true) {
//       alert("Post Added Successfully");
//     }
//     event.target.elements.text.value = "";
//     event.target.elements.topic.value = "";
//     setReload(!reload);
//   };

//   const handleReplyClick = (postId) => {
//     navigate(`/posts/${postId}`);
//   };

//   const handleUsernameClick = (userId) => {
//     //navigate(`/posts?username=${username}`);
//     navigate("/profile", { state: { userId: userId } });
//   };

//   // --------------------------Front-end-------------------------

//   const [offsetY, setOffsetY] = useState(0);
//   const handleScroll = () => setOffsetY(window.pageYOffset);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const springProps1 = useSpring({
//     transform: `translateX(${-offsetY * 1.5}px)`,
//   });
//   const springProps2 = useSpring({
//     transform: `translateX(${offsetY * 1.5}px)`,
//   });
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className="FormContainer">
//       {/* <div className="bg-white"> */}
//         {/* <Logout />
// <Sorting posts={posts} setPosts={setPosts} username={false} />
// <button onClick={() => handleUsernameClick(currUserId)}>
//   My Profile
// </button>
// <p>All Posts</p>
// <form action="" onSubmit={(event) => handleSubmit(event)}>
//   <div className="heading">
//     <h1>WRITE POST</h1>
//   </div>
//   <input type="text" placeholder="Topic" name="topic" min="1" />
//   <textarea
//     placeholder="ADD TEXT HERE"
//     name="text"
//     minLength={1}
//     rows={4}
//     style={{ width: "100%", maxWidth: "500px" }}
//   />
//   <button type="submit">ADD POST</button>
// </form>
//       <div className="posts-section">
//         <ul>
//           {posts &&
//             posts.map((post) => (
//               <li key={post._id}>
//                 <p onClick={() => handleUsernameClick(post.userId)}>
//                   {post.username}
//                 </p>
//                 <div onClick={() => handleReplyClick(post._id)}>
//                   <p>{post.topic}</p>
//                   <p>{post.text}</p>
//                   <button> Reply </button>
//                 </div>
//                 <div className="post-time">
//                   <p>{new Date(post.createdAt).toLocaleString()}</p>
//                 </div>
//                 <br />
//               </li>
//             ))}
//         </ul>
//         {loading ? <Spinner /> : null}
//       </div> */}
//       </div>
//     </div>
//     // </div>
//   );
// }

// // export default App;

import Logout from "./Logout";
import axios from "axios";
import { allPostsRoute, addPostRoute } from "../utils/APIRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import Sorting from "./Sorting";

import { React, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "../css/post.css"; // Import Tailwind CSS styles
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import { InputDialog } from "../components/Dialog";

export default function Post() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [currUsername, setCurrUsername] = useState(null);
  const [currUserId, setCurrUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(localStorage.getItem("USER")).username;
      const userId = JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUsername(username);
      setCurrUserId(userId);
    }
  }, []);

  const handleReplyClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleUsernameClick = (userId) => {
    //navigate(`/posts?username=${username}`);
    navigate("/profile", { state: { userId: userId } });
  };

  // --------------------------Front-end-------------------------

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const springProps1 = useSpring({
    transform: `translateX(${-offsetY * 1.5}px)`,
  });
  const springProps2 = useSpring({
    transform: `translateX(${offsetY * 1.5}px)`,
  });
  // const springProps3 = useSpring({
  //   transform: `translateY(${offsetY >= 400 ? offsetY : 0}px)`,
  // });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (window.pageYOffset > 430) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollPosition);

    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  // const handleClick = () => {
  //   setIsClicked(true);
  // };

  return (
    <div className="App">
      <div className="bg-white">
        {/* <animated.div style={props}>Hello World</animated.div> */}
        <header className="sticky inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1 lg:gap-x-12">
              <button href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">LNM-Q</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </button>
              <div className={`${!showButton ? "hidden" : ""} justify-start`}>
                <Sorting posts={posts} setPosts={setPosts} username={false} />
              </div>
            </div>

            <div className={`${!showButton ? "hidden" : ""}`}>
              <InputDialog posts={posts} setPosts={setPosts} />
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
              {/* <button
                className={`${
                  !showButton ? "hidden" : ""
                } bg-gray-300 border-1 p-2 px-24 rounded-full  shadow-md border-gray-200 mx-auto z-2000 `}
              >
                What do you want to ask or share?
              </button> */}
              <button
                className="text-sm font-semibold leading-6 text-gray-900 "
                onClick={() => handleUsernameClick(currUserId)}
              >
                My Profile
              </button>
              <button
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <Logout />
              </button>
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <button href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">LNM-Q</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </button>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => handleUsernameClick(currUserId)}
                    >
                      My Profile
                    </button>
                  </div>
                  <div className="py-6">
                    <button
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <Logout />
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8 ">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          <div className="content relative overflow-y-scroll h-[82vh] snap-start">
            <animated.div
              style={springProps1}
              className="bg-image hidden lg:block lg:absolute lg:-z-1"
            >
              <img src={img1} alt="Placeholder" />
            </animated.div>
            <animated.div
              style={springProps2}
              className="bg-image hidden lg:block lg:absolute lg:-z-1 right-0"
            >
              <img src={img2} alt="Placeholder" />
            </animated.div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 z-100 ">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  LNM-Q
                </h1>

                {/* <p>All Posts</p>
                <form action="" onSubmit={(event) => handleSubmit(event)}>
                  <div className="heading">
                    <h1>WRITE POST</h1>
                  </div>
                  <input type="text" placeholder="Topic" name="topic" min="1" />
                  <textarea
                    placeholder="ADD TEXT HERE"
                    name="text"
                    minLength={1}
                    rows={4}
                    style={{ width: "100%", maxWidth: "500px" }}
                  />
                  <button type="submit">ADD POST</button>
                </form> */}

                <InputDialog posts={posts} setPosts={setPosts} />
                <div className="mt-10 flex items-center justify-center gap-x-6 ">
                  <div>
                    <Sorting
                      posts={posts}
                      setPosts={setPosts}
                      username={false}
                    />
                  </div>

                  <button
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    All Posts <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center bottom-0 -z-1000">
              <div className="bg-image absolute -z-1000 bottom-0 m-auto">
                <img className="-z-1000" src={img3} alt="Placeholder" />
              </div>
            </div>
          </div>
          <div className="snap-container">
            <ul>
              {posts &&
                posts.map((post) => (
                  <li key={post._id}>
                    <div className="snap-child-s sm:snap-child-l bg-image">
                      <div className="px-6 py-4">
                        <p onClick={() => handleUsernameClick(post.userId)}>
                          {post.username}
                        </p>
                        <div
                          className="font-bold text-xl mb-2"
                          onClick={() => handleReplyClick(post._id)}
                        >
                          {post.topic}
                        </div>
                        <p className="text-gray-700 text-base">{post.text}</p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <button
                          className="inline-block
                          bg-gray-200
                          rounded-full
                          px-3
                          py-1
                          text-sm
                          font-semibold
                          text-gray-700
                          mr-2
                          mb-2"
                        >
                          {" "}
                          Reply{" "}
                        </button>
                        {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #photography
                        </span> */}
                      </div>
                      <div className="post-time">
                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <br />
                  </li>
                ))}
            </ul>
          </div>

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// export default App;
