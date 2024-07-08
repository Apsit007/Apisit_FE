import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header/Header'
import Content from './components/content/Content';
import VisitList from './components/visitlist/VisitList';
import Login from './components/login/login';
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const storedDataString = localStorage.getItem('AccessToken');
  let decoded: DecodedJwtPayload | null = null;

  if (storedDataString) {
    const storedData = storedDataString.toString();
    decoded = jwtDecode(storedData) as DecodedJwtPayload;
    const givenDatetime = new Date(decoded.created_date);
    const currentDatetime = new Date();
    const differenceInMilliseconds = currentDatetime.getTime() - givenDatetime.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    if (differenceInDays > 1) {
      useEffect(() => {
        navigate('/');
      }, []);
      localStorage.clear();
    }
  } else {
    useEffect(() => {
      navigate('/');
    }, []);
  }

  return (
    <>
      {decoded && <Header VisitorName={decoded.VisitorName} VisitorCount={decoded.VisitorCount} />}
      <Content />
      {decoded && <VisitList VisitorId={decoded._id} />}
    </>
  );
}


export default App
interface DecodedJwtPayload {
  VisitorName: string;
  OrganizationName: string;
  Email: string;
  _id: string;
  VisitorCount: number;
  created_date: string;
}