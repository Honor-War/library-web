import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function GeeksforGeeks(){
	const notify = ()=>{
		// inbuilt-notification
		toast.warning('Danger')
		// inbuilt-notification
		toast.success('successful')
		// inbuilt-notification
		toast.info('GeeksForGeeks')
		// inbuilt-notification
		toast.error('Runtime error')
		// default notification
		toast('Hello Geeks')
		console.log("In Geeks for Geeks");
	}
	return (
		<div className="GeeksforGeeks">
			<button onClick={notify}>Click Me!</button>
			</div>
	);
}
export default GeeksforGeeks;
