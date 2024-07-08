import './Content.scss'
import Profile from '../profile/profile'
import Aboutme from '../aboutme/aboutme'
import Catalog from '../catalog/catalog';

function Content() {
    const skill = [
        { title: "Language", detail: "JavaScript  TypeScript HTML CSS  PHP C# PgSQL SQL Java" },
        { title: "Technology", detail: "Angular React ASP .NET  DevExtreme Syncfusion Git  Figma" }
    ];
    const experience = [
        { title: "MULTITA CO., LTD. ", detail: "position : software developer developed api  create database tables draw web as designed by SA team and connect api to web application find and solve problems together within the team" },
        { title: "BETIMES SOLUTIONS CO., LTD ", detail: "position : front-end developer (outsource) developed web application as designed by SA team and connect api to web application" },
        { title: "SCM S TECHNOLOGIES CO., LTD ", detail: "position : Occupational training Practice professional experience in computer science and gain knowledge and experience in software development with AngularJs ,SQl ,API , Linux ,ubantu ,red hat." },
    ];
    return (
        < >
            <Profile />
            <Aboutme />
            <h3 className='text-center mt-5'>Skill</h3>
            <Catalog data={skill} />
            <h3 className='text-center  mt-5'>Experience</h3>
            <Catalog data={experience} />
        </>
    )
}

export default Content