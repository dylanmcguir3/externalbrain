import MaterialList from "../components/list" 
import Blob from "../components/blob"

export default function Home() {
  return (
    <div>
      <div>
        <h1>Retail Research</h1>
        <MaterialList />
      </div>
      <div className="loader-morphing"/>
    </div>
  )
}


