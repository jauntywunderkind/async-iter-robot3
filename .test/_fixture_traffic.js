import { state, transition} from "robot3"

export async function fakeDelay(){
}

export const trafficLight= {
	green: state(
		transition( "step", "yellow")
	),
	yellow: invoke( fakeDelay(),
		transition( "done", "red")
	),
	red: state(
		transition( "step", "green")
	)
}
export default trafficLight

