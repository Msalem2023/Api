import GridLayout from "./Components/grid";
import TopSidebar from "./Components/TopSideBar";
import { useAuth } from "./Hooks/useCurrentUser";
import EditModal from "./Modal/Edit";
import LoginModal from "./Modal/LogIn";
import RegisterModal from "./Modal/Register";
import PromoteModal from "./Modal/Promote";
import AttachModal from "./Modal/Attachment";


function App() {
  const token = sessionStorage.getItem("token")
  const { user } = useAuth()
  console.log(user)
  // const { data } = useQuery(["Home"], () => {
  //   return axios.post('http://localhost:5000/user/posts', {}, {
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `Bearer ${user?.token}`
  //     }
  //   }).then((res) => res.data)
  // })
  return (
    <>
    <AttachModal/>
      <PromoteModal />
      <EditModal />
      <LoginModal />
      <RegisterModal />
      {token ? <GridLayout data={user} /> : <TopSidebar />}
    </>
  );
}

export default App;
