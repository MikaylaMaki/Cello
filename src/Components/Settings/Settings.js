import { EditableText } from '../utils/EditableText'
import './settings.css'

export function Settings(props) {
    return (
        <>
        <span class="settings-activate interaction new click">⚙</span>
        <div className="settings" style={{display: "hidden"}}>
            Forwarding Node:
            <EditableText value="http://localhost:3030" onChange={(e) => {}} />
        </div>
        </>
    )
}