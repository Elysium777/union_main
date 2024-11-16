import { usePrivy } from "@privy-io/react-auth";

const LoginButton = () => {
  const { ready, authenticated, login } = usePrivy();

  const disableLogin = !ready || (ready && authenticated);

  return (
    <button
      disabled={disableLogin}
      onClick={login}
      className="border border-gray-700 rounded-full font-medium px-4 py-2"
    >
      Connect Wallet
    </button>
  );
};

export default LoginButton;
