import Pipe from "async-iter-pipe/pipe.js"
import { interpret } from "robot3/machine.js"

const
	Machine= Symbol.for("async-iter-robot:machine"),
	Service= Symbol.for("async-iter-robot:service")

export function AsyncIterRobot3( machine, opt){
	if( machine.machine&& opt=== undefined){
		opt= machine
		machine= opt.machine
	}
	Pipe.call( this, opt)

	Object.defineProperties( this, {
		_onChangeListener: {
			value: this._onChangeListener.bind( this)
		}
	})
	this.machine= machine // calls 'machine' setter which creates 'service'
	return this
}
export {
	AsyncIterRobot3 as default,
	AsyncIterRobot3 as asyncIterRobot3,
	AsyncIterRobot3 as robot,
	AsyncIterRobot3 as Robot
}
AsyncIterRobot3.prototype= Object.create( Pipe.prototype, {
	_onChangeListener: {
		value: function(){
			// push ourself as a new iteration
			return this.push( this)
		}
	},
	machine: {
		get: function(){
			return this[ Machine]
		},
		set: function( machine){
			this[ Machine]= machine
			this.service= interpret( machine, this._onChangeListener, this)
		}
	},
	service: {
		get: function(){
			return this[ Service]
		},
		set: function( service){
			this[ Service]= service
		}
	},
	current: {
		get: function(){
			return this.service.machine.current
		}
	},
	send: {
		get: function(){
			return this.service.send
		}
	}
})
AsyncIterRobot3.prototype.constructor= AsyncIterRobot3
