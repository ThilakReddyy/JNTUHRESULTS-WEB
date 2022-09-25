import Head from "next/head";
const Header=()=>{
    return (
    <Head>
        <title>JNTUH B.Tech Results</title>
        <link id="favicondark" rel='icon' href='/favicon-black.png' />
        <meta
          property='og:url'
          content='https://jntuhresults.vercel.app/'
        />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='JNTUH B.Tech Results' />
        <meta name='twitter:card' content='summary' />
        {/* <meta name="viewport" content="width=1024"></meta> */}
        <meta
          property='og:description'
          content='You can find the Results of your entire B Tech semesters here of Jawaharlal Nehru Technological University, Hyderabad (JNTUH).'
        />
        <meta
          property='og:image'
          content={
            'https://user-images.githubusercontent.com/64121161/168486734-5d799aed-6110-47aa-8338-a0aa3c70e963.png'
          }
        />
        <script
            dangerouslySetInnerHTML={{
              __html: `
              if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    console.log("dark Mode");         
                }
                else
                {
                  console.log("light mode");
                }
                  `,
            }}
          >    
        </script>
    </Head>
    )
}
export default Header;