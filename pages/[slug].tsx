import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
} from "next";
import ThemeOne from "@/themes/themeOne/Index";

interface Person {
  data: [
    {
      slug?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
      dob?: string;
      death?: string;
      facebookLink?: string;
      linkedinLink?: string;
      twitterLink?: string;
      uploadDatas?: {
        [key: number]: string[]; // Assuming the keys are numbers and values are string arrays
      };
      color?: string;
    }
  ];
}
type UploadDatasType = {
  age: string[];
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXTAUTH_URL}/api/slugs/get-slugs`);
//     if (!res.ok) {
//       throw new Error("Failed to fetch slugs");
//     }
//     const repo = await res.json();
//     // console.log(repo.users, "REPOOOO");
//     const { users } = repo;
//     console.log(users);

//     let pathHolder: string[] = [];

//     const paths = users.map((user: any) => {
//       const { userData } = user;

//       userData.map((userInfo: any) => {
//         pathHolder.push(userInfo.slug);
//       });
//       return pathHolder;
//     });

//     console.log(paths[0], "PATHSS");

//     return {
//       paths: paths[0],
//       fallback: false,
//     };
//   } catch (error) {
//     console.error("Error fetching slugs:", error);
//     return {
//       paths: [],
//       fallback: false,
//     };
//   }
// };

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  try {
    const { params } = context;
    const currentPage = params?.slug;
    console.log(currentPage, "currentPage");
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/slugs/get-slugs`);
    if (!res.ok) {
      throw new Error("Failed to fetch slugs");
    }
    const response = await res.json();
    let data = {};
    response.users.map((user: any) => {
      const { userData } = user;
      userData.map((userInfo: any) => {
        if (userInfo.slug === `/${currentPage}`) {
          data = userData.filter(
            (user: any) => user.slug === `/${currentPage}`
          );
        }
        return;
      });
    });
    return { props: { data } };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return { props: { data: {} } };
  }
};

export default function Page({ data }: { data: any }) {
  console.log(data, "DATA ON CLIENT");
  return <ThemeOne data={data} />;
}
