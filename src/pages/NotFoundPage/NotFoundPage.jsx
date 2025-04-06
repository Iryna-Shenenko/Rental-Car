import { Link } from "react-router-dom";
import { BiGhost } from "react-icons/bi";
import { Logo } from "../../components/Logo/Logo";
import Container from "../../components/Container/Container";

export default function NotFoundPage() {
  return (
    <Container>
      <div >
        <BiGhost size={100} color="#3470FF" />
        <h2 >Page not found - 404</h2>
        <div >
          <Link to="/" >
            Go home
          </Link>
        </div>
      </div>
    </Container>
  );
}