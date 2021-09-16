import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget'
import { Photo, Profile } from '../../app/models/Profile'
import { useStore } from '../../app/stores/store'

interface Props{
    profile: Profile;
}

const ProfilePhotos = ({profile}: Props) => {
    const {profileStore: {isCurrentUser, uploadPhoto, 
        uploadingPhoto, setMainPhoto, loadingSetMainOrDel,deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    // State to determ if we have that photo
    const [target, setTarget] = useState('');

    // Function that handles the file of type Blob and uploads it.
    const handlePhotoUpload = (file: Blob) =>{
        uploadPhoto(file).then(() => setAddPhotoMode(false))
    }

    // Sets the main photo..
    const handleSetMainPhoto = 
    (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    // Deletes one specific photo thrue but event click that is not the main.
    const handleDeletePhoto = 
    (photo: Photo,  e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photo' />
                    {isCurrentUser && (
                        <Button 
                            floated='right' 
                            basic 
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )} 
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploadingPhoto}/>
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                    <Card key={photo.id}>
                                        <Image src={photo.url} />
                                        {isCurrentUser && (
                                            <Button.Group fluid widths={2}>
                                                <Button 
                                                    basic 
                                                    color='green'
                                                    content='Main' 
                                                    name={'main' + photo.id}
                                                    disabled={photo.isMain}
                                                    loading={target === 'main' + photo.id && loadingSetMainOrDel}
                                                    onClick={e => handleSetMainPhoto(photo, e)}
                                                />

                                                <Button 
                                                    basic
                                                    color='red'
                                                    icon='trash' 
                                                    loading={target === photo.id && loadingSetMainOrDel}
                                                    onClick={e => handleDeletePhoto(photo, e)}
                                                    disabled={photo.isMain}
                                                    name={photo.id}
                                                />
                                            </Button.Group>)}
                                    </Card>
                                ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos)
