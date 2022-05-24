import React, {useState, useEffect} from 'react'
import Element from '../Element/Element'
import Spinner from '../../Spinner'

const HowWeWork = ({Data}) => {

    const [SectionData, SetSectionData] = useState(null)

    useEffect(() => {
        SetSectionData(Data.child.filter(val => val.slug.includes('how-we-work'))[0])
    }, [Data])

    return (
        <div className="dynamic_content">
            {
                SectionData ?
                <>
                    {
                        SectionData.sections.map(item => {
                            return <Element data={item} key={item.id} />
                        })
                    }
                </> : <Spinner />
            }
        </div>
    )
}

export default HowWeWork

