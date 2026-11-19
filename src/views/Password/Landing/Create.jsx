import CompetitionSetup from "../../../components/Competition/Setup";
import { setNames } from "../../../redux/password";

export default function CreateGame() {
  return <CompetitionSetup game="PassWord" setNames={setNames} />;
}
