import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { url } from '../../config/next.config'
import Link from "next/link";
import Router from 'next/router';

import { DiscussionEmbed } from "disqus-react"
import { NavigationBar } from '../../components/NavigationBar';
import { Footer } from '../../components/Footer';

export default function Home({ course }) {
  //shows the list of lectures of the course
  const list =() =>(
    //map each item of lecture list to the li
    <div>
      {course.lectures.map((element, index) => {
        return(
          <li class="list-group-item">
            <div className={styles.courselist}>
                <div class="ms-2 me-auto">
                  <div class="fw-bold">
                    <Link href={"/lecture/" + (element.id==undefined?'landing':element.id)}>
                      <h5>{element.title}</h5>
                    </Link>
                  </div>
                  <br></br>
                  <p>{element.about}</p>
                </div>
            </div>
          </li>
        )
      })}                
                        
    </div>
  );

  return (
    <div>
      <Head>
        <title>{course.title}</title>
      </Head>
      <div className={styles.course} class="px-4 pt-5 my-5 text-center border-bottom">
        <h1 class="display-4 fw-bold">{course.title}</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">{course.about}</p>
            </div>
            <div class="overflow-hidden">
                <div class="container px-5">
                    <img src={`${url}`+course.logo_img.url} class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy"/>
                </div>
            </div>
            <div class="card text-center">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="true" href="#">Lectures</a>
                      </li>
                    </ul>
                </div>
                {list()}
            </div>
          </div>

    </div>
  )
}

// send GET Request to {url}/courses and get course list
export const getStaticProps = async (context) => {

  const data = await fetch(`${url}/courses/${context.params.id}`);
  const course = await data.json();

  return {
    props: { course },
    revalidate: 1,
  };
};

// send GET Request to {url}/courses and get course list
export async function getStaticPaths() {
    const res = await fetch(`${url}/courses`);
    const courses = await res.json();
  
    const paths = courses && courses.map((item) => ({
      params: { id: item.id.toString() },
    }));
  
    return { paths, fallback: false };
  };