import { gql, useQuery } from "@apollo/client";

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
    }
  }
`;

type Lesson = {
  id: string;
  title: string;
};

const App = () => {
  const { data } = useQuery(GET_LESSONS_QUERY);

  return (
    <div>
      <ul>
        {data?.lessons?.map((lesson: Lesson) => (
          <li key={lesson?.id}>
            <h2>{lesson?.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
