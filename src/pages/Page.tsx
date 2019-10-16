import React from 'react'
import { IonPage } from '@ionic/react'

interface Props {
  backgroundImage: string
}

const Page: React.FC<Props> = ({ backgroundImage, children }) => {
  return (
    <IonPage>
      <div
        className='background'
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          height: '100vh'
        }}
      >
        {children}
      </div>
    </IonPage>
  )
}

export default Page
