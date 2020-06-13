import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

const OUTCOME_DIMENSIONS = '30px'

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 50px 20px 30px;
`

const Title = styled.h1`
  font-size: 17px;
  font-weight: 500;
  margin: 0 0 20px;
`

const SubTitle = styled.h2`
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 10px;
`

const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 20px;
`

const Form = styled.div`
  border-radius: 3px;
  border: 1px solid #d5d5d5;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: 25px;
  width: 500px;
`

const Button = styled.button`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #d5d5d5;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  height: 40px;
  margin: 0 0 0 auto;
  outline: none;
  padding: 0 20px;
  user-select: none;
`

const TopArea = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  min-height: 272px;
  padding: 20px;
`

const NewCollectionArea = styled.div`
  background-color: #fdfdfd;
  border-radius: 3px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  min-height: ${OUTCOME_DIMENSIONS};
  padding: 10px 10px 5px 10px;

  &:empty {
    padding-bottom: 10px;
  }
`

const SubtitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 0 10px;

  .subtitle {
    margin-bottom: 0;
  }
`

const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 0 0 auto;
`

const Control = styled.span`
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`

const Separator = styled.span`
  margin: 0 8px;
`

const Collections = styled.div`
  border: 1px solid #d5d5d5;
  display: flex;
  flex-direction: column;
  height: 250px;
  margin: 0 0 30px;
  overflow: auto;
`

const Collection = styled.div`
  border-bottom: 1px solid #d5d5d5;
  display: flex;
  padding: 10px 10px 5px 10px;

  &:last-child {
    margin-bottom: -1px;
  }
`

const CollectionOutcomes = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`

const CollectionsCheckContainer = styled.label`
  align-items: center;
  border-right: 1px solid #d5d5d5;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  margin: -10px 10px -5px 0;
  padding: 0 10px 0 0;
`

const Outcomes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

const Outcome = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  height: ${OUTCOME_DIMENSIONS};
  justify-content: center;
  margin-bottom: 5px;
  margin-right: 5px;
  user-select: none;
  width: ${OUTCOME_DIMENSIONS};
`

function App() {
  const defaultCollections = [
    [{ name: 'Outcome 0', id: 0 }],
    [{ name: 'Outcome 1', id: 1 }],
    [{ name: 'Outcome 2', id: 2 }],
    [{ name: 'Outcome 3', id: 3 }],
    [{ name: 'Outcome 4', id: 4 }],
    [{ name: 'Outcome 5', id: 5 }],
    [{ name: 'Outcome 6', id: 6 }],
    [{ name: 'Outcome 7', id: 7 }],
    [{ name: 'Outcome 8', id: 8 }],
    [{ name: 'Outcome 9', id: 9 }],
    [{ name: 'Outcome 10', id: 10 }],
    [{ name: 'Outcome 11', id: 11 }],
    [{ name: 'Outcome 12', id: 12 }],
    [{ name: 'Outcome 13', id: 13 }],
    [{ name: 'Outcome 14', id: 14 }],
    [{ name: 'Outcome 15', id: 15 }],
    [{ name: 'Outcome 16', id: 16 }],
    [{ name: 'Outcome 17', id: 17 }],
    [{ name: 'Outcome 18', id: 18 }],
    [{ name: 'Outcome 19', id: 19 }],
  ]

  const [allCollections, setAllCollections] = useState(defaultCollections)
  const [newCollection, setNewCollection] = useState([])
  const [availableOutcomes, setAvailableOutcomes] = useState([])
  const [removeCollectionsQueue, setRemoveCollectionsQueue] = useState([])
  const [draggedOutcome, setDraggedOutcome] = useState()

  const removeOutcomeFromCollection = useCallback(
    (collectionIndex, outcomeIndex) => {
      console.log(allCollections[collectionIndex][outcomeIndex])
      setAvailableOutcomes([...availableOutcomes, allCollections[collectionIndex][outcomeIndex]])

      allCollections[collectionIndex].splice(outcomeIndex, 1)

      setAllCollections([
        ...allCollections.filter((item) => {
          return item.length > 0
        }),
      ])
    },
    [availableOutcomes, allCollections],
  )

  const addOutcomeToNewCollection = useCallback(
    (outcomeIndex) => {
      setNewCollection([...newCollection, availableOutcomes[outcomeIndex]])
      availableOutcomes.splice(outcomeIndex, 1)
    },
    [newCollection, availableOutcomes],
  )

  const removeOutcomeFromNewCollection = useCallback(
    (outcomeIndex) => {
      setAvailableOutcomes([...availableOutcomes, newCollection[outcomeIndex]])
      newCollection.splice(outcomeIndex, 1)
    },
    [newCollection, availableOutcomes],
  )

  const addNewCollection = useCallback(() => {
    setAllCollections([[...newCollection], ...allCollections])
    newCollection.length = 0
  }, [newCollection, allCollections])

  const clearOutcomesFromNewCollection = useCallback(() => {
    setAvailableOutcomes([...availableOutcomes, ...newCollection])
    newCollection.length = 0
  }, [availableOutcomes, newCollection])

  const addAllAvailableOutcomesToNewCollection = useCallback(() => {
    setNewCollection([...newCollection, ...availableOutcomes])
    availableOutcomes.length = 0
  }, [availableOutcomes, newCollection])

  const toggleRemoveCollectionsQueue = useCallback(
    (collectionIndex) => {
      if (removeCollectionsQueue.includes(collectionIndex)) {
        removeCollectionsQueue.splice(removeCollectionsQueue.indexOf(collectionIndex), 1)
      } else {
        setRemoveCollectionsQueue([...removeCollectionsQueue, collectionIndex])
      }

      // hack, just to update list, fix later
      setAllCollections([...allCollections])
    },
    [removeCollectionsQueue, allCollections],
  )

  const removeSelectedCollections = useCallback(() => {
    let newAvailableOutcomes = []

    removeCollectionsQueue.forEach((collectionIndex) => {
      allCollections[collectionIndex].forEach((outcome) => {
        newAvailableOutcomes.push(outcome)
      })
      allCollections[collectionIndex].length = 0
    })

    setAllCollections([...allCollections.filter((collection) => collection.length > 0)])
    setAvailableOutcomes([...availableOutcomes, ...newAvailableOutcomes])
    removeCollectionsQueue.length = 0
  }, [removeCollectionsQueue, allCollections, availableOutcomes])

  const removeAllCollections = useCallback(() => {
    let newAvailableOutcomes = []

    allCollections.forEach((item) => {
      item.forEach((subitem) => {
        newAvailableOutcomes.push(subitem)
      })
    })

    setAvailableOutcomes([...availableOutcomes, ...newAvailableOutcomes])
    allCollections.length = 0
  }, [allCollections, availableOutcomes])

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    e.currentTarget.style.backgroundColor = '#f5f5f5'
  }, [])

  const onDragLeave = useCallback((e) => {
    e.currentTarget.style.backgroundColor = 'transparent'
  }, [])

  const onDrop = useCallback(
    (e, collectionToIndex) => {
      const collectionFromIndex = e.dataTransfer.getData('collectionFromIndex')
      const outcomeIndex = e.dataTransfer.getData('outcomeIndex')

      e.currentTarget.style.backgroundColor = 'transparent'
      allCollections[collectionFromIndex].splice(outcomeIndex, 1)
      allCollections[collectionToIndex].push(draggedOutcome)
      setAllCollections([...allCollections.filter((collection) => collection.length > 0)])
    },
    [allCollections, draggedOutcome],
  )

  const onDragStart = useCallback((e, collectionFromIndex, outcome, outcomeIndex) => {
    e.dataTransfer.setData('collectionFromIndex', collectionFromIndex)
    e.dataTransfer.setData('outcomeIndex', outcomeIndex)
    setDraggedOutcome(outcome)
  }, [])

  const notEnoughCollections = allCollections.length < 2
  const orphanedOutcomes = availableOutcomes.length > 0 || newCollection.length > 0

  return (
    <Main>
      <Form>
        <Title>Edit Partition</Title>
        <TopArea>
          <SubtitleWrapper>
            <SubTitle className="subtitle">Add Outcomes To Collection</SubTitle>
            <Controls>
              <Control onClick={addAllAvailableOutcomesToNewCollection}>Add All</Control>
            </Controls>
          </SubtitleWrapper>
          {availableOutcomes.length ? (
            <>
              <Text>Click on an outcome to add it to the collection.</Text>
              <Outcomes>
                {availableOutcomes.map((outcome, outcomeIndex) => {
                  return (
                    <Outcome
                      onClick={() => {
                        addOutcomeToNewCollection(outcomeIndex)
                      }}
                      className="outcome"
                      key={outcomeIndex}
                      title={outcome.name}
                    >
                      {outcome.id}
                    </Outcome>
                  )
                })}
              </Outcomes>
            </>
          ) : (
            <Text>No outcomes available. You can make them available by removing collections below.</Text>
          )}
          <SubtitleWrapper>
            <SubTitle className="subtitle">New Collection</SubTitle>
            <Controls>
              <Control onClick={clearOutcomesFromNewCollection}>Clear</Control>
            </Controls>
          </SubtitleWrapper>
          <NewCollectionArea>
            {newCollection.map((outcome, outcomeIndex) => {
              return (
                <Outcome
                  onClick={() => {
                    removeOutcomeFromNewCollection(outcomeIndex)
                  }}
                  title={outcome.name}
                  key={outcomeIndex}
                >
                  {outcome.id}
                </Outcome>
              )
            })}
          </NewCollectionArea>
          <Button
            onClick={() => {
              addNewCollection()
            }}
            disabled={newCollection.length === 0}
            style={{ marginTop: 'auto' }}
          >
            Add
          </Button>
        </TopArea>
        <SubtitleWrapper>
          <SubTitle className="subtitle">Collections</SubTitle>
          <Controls>
            <Control onClick={removeSelectedCollections}>Remove Selected Collections</Control>
            <Separator>|</Separator>
            <Control onClick={removeAllCollections}>Remove All Collections</Control>
          </Controls>
        </SubtitleWrapper>
        <Text>Click on an outcome to remove it from a collection. You can also drag outcomes across collections.</Text>
        <Collections>
          {allCollections.length ? (
            allCollections.map((collection, collectionIndex) => {
              return (
                <Collection
                  key={collectionIndex}
                  onDrop={(e) => onDrop(e, collectionIndex)}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                >
                  <CollectionsCheckContainer>
                    <input
                      checked={removeCollectionsQueue.includes(collectionIndex)}
                      onChange={() => toggleRemoveCollectionsQueue(collectionIndex)}
                      type="checkbox"
                    />
                  </CollectionsCheckContainer>
                  <CollectionOutcomes>
                    {collection.map((outcome, outcomeIndex) => {
                      return (
                        <Outcome
                          onClick={() => {
                            removeOutcomeFromCollection(collectionIndex, outcomeIndex)
                          }}
                          key={outcomeIndex}
                          title={outcome.name}
                          draggable
                          onDragStart={(e) => {
                            onDragStart(e, collectionIndex, outcome, outcomeIndex)
                          }}
                        >
                          {outcome.id}
                        </Outcome>
                      )
                    })}
                  </CollectionOutcomes>
                </Collection>
              )
            })
          ) : (
            <Text style={{ margin: 'auto' }}>No Collections</Text>
          )}
        </Collections>
        <Button disabled={notEnoughCollections || orphanedOutcomes}>Save</Button>
      </Form>
    </Main>
  )
}

export default App
