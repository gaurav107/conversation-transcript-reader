import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import store from './store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import reportWebVitals from './reportWebVitals'

const theme = {
	primary: 'rgba(26, 153, 246)',
	primary5: 'rgba(26, 153, 246, 0.05)',
	primary25: 'rgba(26, 153, 246, 0.25)',
	secondary: 'rgba(136, 104, 233)',
	secondary25: 'rgba(136, 104, 233, 0.25)',
	headerBackground: '#EFF3F6',
	primaryText: '#556c86',
	secondaryText: '#354053',
	fontSize: '13px',
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
