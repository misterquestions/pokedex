import { GetStaticProps, NextPage } from 'next';
import GetAllPokemons from '@services/interfaces/GetAllPokemons';
import { getAllPokemons } from '@services/pokemon';

export const getStaticProps: GetStaticProps<GetAllPokemons> = async () => {
  const props = await getAllPokemons();

  return {
    props,
  };
};

const IndexPage: NextPage<GetAllPokemons> = ({ hasError, errorMessages }) => {
  if (hasError && errorMessages) {
    return (
      <>
        {errorMessages.map((message) => (
          <p key={message}>{message}</p>
        ))}
      </>
    );
  }

  return <p>Hello world!</p>;
};

export default IndexPage;
