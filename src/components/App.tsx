import React, { useEffect, useRef } from 'react'
import '../styles/App.css'
import Header from './Header'

function App() {
	const audioRef = useRef<HTMLAudioElement>(null)
	useEffect(() => {
		audioRef.current?.play()
	})
	return (
		<div>
			<Header />
		</div>
	)
}

export default App
