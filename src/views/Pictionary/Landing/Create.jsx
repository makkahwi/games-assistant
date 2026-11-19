import CompetitionSetup from "../../../components/Competition/Setup";
import { setNames } from "../../../redux/pictionary";

export default function CreateGame() {
  return <CompetitionSetup game="Pictionary" setNames={setNames} />;
}
