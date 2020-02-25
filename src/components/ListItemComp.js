import React from 'react'
import { View } from 'react-native'
import { Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
// import { withNavigation } from '@react-navigation/compat';

const ListItemComp = (props) => {
    const {name, status, type, image} = props.data.show
    return(
        <View>
            <Content>
          <List>
            <ListItem avatar>
              <Left>
                {image ? <Thumbnail source={{ uri: `${image.medium}` }} />:<Text>No Image</Text>}
              </Left>
              <Body>
                <Text>{name}</Text>
                <Text note>{type}</Text>
              </Body>
              <Right>
                <Text note>{status}</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
        </View>
    )
}

export default ListItemComp
