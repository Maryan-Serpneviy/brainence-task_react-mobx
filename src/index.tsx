import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { DndProvider } from 'react-dnd'
import { isMobile } from 'react-device-detect'
import html5Backend from 'react-dnd-html5-backend'
import touchBackend from 'react-dnd-touch-backend'
import Products from '~cn/Products'
import store from '~s'
import './index.scss'

function App() {
    return (
        <DndProvider backend={isMobile ? touchBackend : html5Backend}>
            <Provider store={store}>
                <div className="App">
                    <Products />
                </div>
            </Provider>
        </DndProvider>
    )
}


ReactDOM.render(<App />, document.querySelector('#root'))
