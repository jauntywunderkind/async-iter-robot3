import { createMachine, invoke, state, transition} from "robot3/machine.js"

export async function fakeDelay(){
}

export const trafficLight= createMachine({
	green: state(
		transition( "step", "yellow")
	),
	yellow: invoke( fakeDelay,
		transition( "done", "red")
	),
	red: state(
		transition( "step", "green")
	)
})
export default trafficLight

