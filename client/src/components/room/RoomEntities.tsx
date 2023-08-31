

type RoomEntityListProps = {
    heading: string,
    entityList : any[],
    entityKey: string,
    selfUsername: string,
}

export const RoomEntityList = ({heading, entityList, entityKey, selfUsername}:RoomEntityListProps) => {
  return (
    <>
        <p className='mb-0 mt-5 fw-bold'>{heading}</p>
            {entityList.map((ent: any, i: any) => (
                entityKey === "" ?
                <p className='mb-0' key={i}>{ent}</p>
                :
                    (ent[entityKey] === selfUsername ?
                    <p className='mb-0 text-primary' key={i}>{ent[entityKey]}</p>
                    :
                    <p className='mb-0' key={i}>{ent[entityKey]}</p>)
            ))}
    </>
  )
}
