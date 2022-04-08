module.exports = [
  "../src/routes/routes.ts",
  "../src/routes/contexts/contextFindNodeByDate.ts",
  "../src/routes/contexts/contextList.ts",
  "../src/routes/contexts/contextNodeTypeList.ts",
  "../src/routes/contexts/contextNodeTypeListOfNode.ts",
  "../src/routes/contexts/contextNodesOfType.ts",
  "../src/routes/contexts/contextNodesOfTypeFornode.ts",
  "../src/routes/contexts/contextTree.ts",
  "../src/routes/contexts/contextTreeDepth.ts",
  "../src/routes/contexts/findInContext.ts",
  "../src/routes/contexts/interfacesContexts.ts",
  "../src/routes/contexts/nodeTreeInContext.ts",
  "../src/routes/nodes/interfacesNodes.ts",
  "../src/routes/nodes/node.ts",
  "../src/routes/nodes/nodeControlEndPointList.ts",
  "../src/routes/nodes/nodeDownloadFile.ts",
  "../src/routes/nodes/nodeEndPointList.ts",
  "../src/routes/nodes/nodeEventList.ts",
  "../src/routes/nodes/nodeFileList.ts",
  "../src/routes/nodes/nodeNoteList.ts",
  "../src/routes/nodes/nodeTicketList.ts",
  "../src/routes/nodes/nodeUploadFile.ts",
  "../src/routes/nodes/relationChildrenNode.ts",
  "../src/routes/nodes/relationParentNode.ts",
  "../src/routes/nodes/testUploadFileBase64.ts",
  "../src/routes/categoriesAttributs/categoriesList.ts",
  "../src/routes/categoriesAttributs/createCategory.ts",
  "../src/routes/categoriesAttributs/deleteCategoryById.ts",
  "../src/routes/categoriesAttributs/deleteCategoryByName.ts",
  "../src/routes/categoriesAttributs/interfacesCategoriesAtrtribut.ts",
  "../src/routes/categoriesAttributs/readCategoryById.ts",
  "../src/routes/categoriesAttributs/readCategoryByName.ts",
  "../src/routes/categoriesAttributs/updateCategoryById.ts",
  "../src/routes/categoriesAttributs/updateCategoryByName.ts",
  "../src/routes/attributs/attributList.ts",
  "../src/routes/attributs/createAttribut.ts",
  "../src/routes/attributs/deleteAttribute.ts",
  "../src/routes/attributs/interfacesAttributs.ts",
  "../src/routes/attributs/updateAttribute.ts",
  "../src/routes/geographicContext/building/readBuilding.ts",
  "../src/routes/geographicContext/equipement/equipementEndPoint.ts",
  "../src/routes/geographicContext/equipement/equipementEndpointControlList.ts",
  "../src/routes/geographicContext/equipement/equipementEvent.ts",
  "../src/routes/geographicContext/equipement/equipementFileList.ts",
  "../src/routes/geographicContext/equipement/equipementNotes.ts",
  "../src/routes/geographicContext/equipement/equipementTicketList.ts",
  "../src/routes/geographicContext/equipement/readEquipement.ts",
  "../src/routes/geographicContext/floor/floorDetails.ts",
  "../src/routes/geographicContext/floor/floorList.ts",
  "../src/routes/geographicContext/floor/floorReferencesObjectsList.ts",
  "../src/routes/geographicContext/geographicContextSpace.ts",
  "../src/routes/geographicContext/geographicContextTree.ts",
  "../src/routes/geographicContext/getPositionNode.ts",
  "../src/routes/geographicContext/interfacesGeoContext.ts",
  "../src/routes/geographicContext/room/readRoom.ts",
  "../src/routes/geographicContext/room/readRoomDetails.ts",
  "../src/routes/geographicContext/room/readStaticsDetails.ts",
  "../src/routes/geographicContext/room/roomEndPointControlList.ts",
  "../src/routes/geographicContext/room/roomEndPointList.ts",
  "../src/routes/geographicContext/room/roomEquipementList.ts",
  "../src/routes/geographicContext/room/roomEvent.ts",
  "../src/routes/geographicContext/room/roomFileList.ts",
  "../src/routes/geographicContext/room/roomList.ts",
  "../src/routes/geographicContext/room/roomNotes.ts",
  "../src/routes/geographicContext/room/roomReferenceObjectsList.ts",
  "../src/routes/geographicContext/room/roomTicketList.ts",
  "../src/routes/IoTNetwork/BmsNetwork/bmsNetworkList.ts",
  "../src/routes/IoTNetwork/BmsNetwork/createBmsNetwork.ts",
  "../src/routes/IoTNetwork/BmsNetwork/deleteBmsNetwork.ts",
  "../src/routes/IoTNetwork/BmsNetwork/updateBmsNetwork.ts",
  "../src/routes/IoTNetwork/IoTNetworkContext/IoTNetworkList.ts",
  "../src/routes/IoTNetwork/IoTNetworkContext/IoTNetworkTree.ts",
  "../src/routes/IoTNetwork/IoTNetworkContext/IoTNetworkTypeList.ts",
  "../src/routes/IoTNetwork/IoTNetworkContext/createIotNetwork.ts",
  "../src/routes/IoTNetwork/IoTNetworkContext/deleteIoTNetwork.ts",
  "../src/routes/IoTNetwork/IoTNetworkContext/findNodeInIoTNetwork.ts",
  "../src/routes/IoTNetwork/IoTNetworkContext/readNodeInIoTNetwork.ts",
  "../src/routes/IoTNetwork/IoTNetworkContext/updateIoTNetwork.ts",
  "../src/routes/IoTNetwork/device/createDevice.ts",
  "../src/routes/IoTNetwork/device/deleteDevice.ts",
  "../src/routes/IoTNetwork/device/deviceList.ts",
  "../src/routes/IoTNetwork/device/updateDevice.ts",
  "../src/routes/IoTNetwork/endPoint/createEndPoint.ts",
  "../src/routes/IoTNetwork/endPoint/deleteEndPoint.ts",
  "../src/routes/IoTNetwork/endPoint/endointList.ts",
  "../src/routes/IoTNetwork/endPoint/endpointAttributs.ts",
  "../src/routes/IoTNetwork/endPoint/readEndPointCurrentValue.ts",
  "../src/routes/IoTNetwork/endPoint/updateEndPointCurrentValue.ts",
  "../src/routes/IoTNetwork/interfacesEndpointAndTimeSeries.ts",
  "../src/routes/IoTNetwork/networkService.ts",
  "../src/routes/IoTNetwork/spinalTimeSeries.ts",
  "../src/routes/IoTNetwork/timeSeries/insertTimeSeries.ts",
  "../src/routes/IoTNetwork/timeSeries/pushTimeSeries.ts",
  "../src/routes/IoTNetwork/timeSeries/readTimeSeries.ts",
  "../src/routes/IoTNetwork/timeSeries/readTimeSeriesCurrentDay.ts",
  "../src/routes/IoTNetwork/timeSeries/readTimeSeriesCurrentMonth.ts",
  "../src/routes/IoTNetwork/timeSeries/readTimeSeriesCurrentWeek.ts",
  "../src/routes/IoTNetwork/timeSeries/readTimeSeriesCurrentYear.ts",
  "../src/routes/IoTNetwork/timeSeries/readTimeSeriesFrom Last24H.ts",
  "../src/routes/tickets/interfacesWorkflowAndTickets.ts",
  "../src/routes/tickets/process/createProcess.ts",
  "../src/routes/tickets/process/deleteProcess.ts",
  "../src/routes/tickets/process/processList.ts",
  "../src/routes/tickets/process/updateProcess.ts",
  "../src/routes/tickets/steps/createStep.ts",
  "../src/routes/tickets/steps/deleteStep.ts",
  "../src/routes/tickets/steps/stepsListFromProcess.ts",
  "../src/routes/tickets/steps/updateStep.ts",
  "../src/routes/tickets/tickets/createTicket.ts",
  "../src/routes/tickets/tickets/readTicket.ts",
  "../src/routes/tickets/tickets/ticketAddDoc.ts",
  "../src/routes/tickets/tickets/ticketAddNote.ts",
  "../src/routes/tickets/tickets/ticketArchive.ts",
  "../src/routes/tickets/tickets/ticketChangeNode.ts",
  "../src/routes/tickets/tickets/ticketChangeProcess.ts",
  "../src/routes/tickets/tickets/ticketChangeWorkflow.ts",
  "../src/routes/tickets/tickets/ticketCreateEvent.ts",
  "../src/routes/tickets/tickets/ticketEventList.ts",
  "../src/routes/tickets/tickets/ticketFindEntity.ts",
  "../src/routes/tickets/tickets/ticketNextStep.ts",
  "../src/routes/tickets/tickets/ticketPreviousStep.ts",
  "../src/routes/tickets/tickets/ticketUnarchive.ts",
  "../src/routes/tickets/workflows/createWorkflow.ts",
  "../src/routes/tickets/workflows/deleteWorkflow.ts",
  "../src/routes/tickets/workflows/findNodeInWorkflow.ts",
  "../src/routes/tickets/workflows/readNodeInWorkflow.ts",
  "../src/routes/tickets/workflows/readWorkflow.ts",
  "../src/routes/tickets/workflows/updateWorkflow.ts",
  "../src/routes/tickets/workflows/workflowList.ts",
  "../src/routes/tickets/workflows/workflowTree.ts",
  "../src/routes/tickets/workflows/workflowTypeList.ts",
  "../src/routes/notes/addNotes.ts",
  "../src/routes/notes/interfacesNotes.ts",
  "../src/routes/notes/updateNotes.ts",
  "../src/routes/calendar/EventContext/EventContextTree.ts",
  "../src/routes/calendar/EventContext/createEventContext.ts",
  "../src/routes/calendar/EventContext/listEventContext.ts",
  "../src/routes/calendar/Events/createEvent.ts",
  "../src/routes/calendar/Events/readEvent.ts",
  "../src/routes/calendar/Events/removeEvent.ts",
  "../src/routes/calendar/Events/updateEvent.ts",
  "../src/routes/calendar/eventCategories/createEventCategory.ts",
  "../src/routes/calendar/eventCategories/listEventCatedory.ts",
  "../src/routes/calendar/eventGroup/createEventGroup.ts",
  "../src/routes/calendar/eventGroup/listEventGroup.ts",
  "../src/routes/calendar/interfacesContextsEvents.ts",
  "../src/routes/groupContext/category/createCategory.ts",
  "../src/routes/groupContext/category/deleteCategory.ts",
  "../src/routes/groupContext/category/listCategory.ts",
  "../src/routes/groupContext/category/readCategory.ts",
  "../src/routes/groupContext/category/updateCategory.ts",
  "../src/routes/groupContext/context/createGroupContext.ts",
  "../src/routes/groupContext/context/deleteGroupContext.ts",
  "../src/routes/groupContext/context/listGroupContext.ts",
  "../src/routes/groupContext/context/readGroupContext.ts",
  "../src/routes/groupContext/context/treeGroupContext.ts",
  "../src/routes/groupContext/context/updateGroupContext.ts",
  "../src/routes/groupContext/contextsOfType.ts",
  "../src/routes/groupContext/elementOfGroup/elementListOfGroup.ts",
  "../src/routes/groupContext/group/createGroup.ts",
  "../src/routes/groupContext/group/deleteGroup.ts",
  "../src/routes/groupContext/group/listGroup.ts",
  "../src/routes/groupContext/group/readGroup.ts",
  "../src/routes/groupContext/group/updateGroup.ts",
  "../src/routes/groupContext/groupeContextTypeList.ts",
  "../src/routes/groupContext/interfacesGroupContexts.ts",
  "../src/routes/roomGroup/category/createCategory.ts",
  "../src/routes/roomGroup/category/deleteCategory.ts",
  "../src/routes/roomGroup/category/listCategory.ts",
  "../src/routes/roomGroup/category/readCategory.ts",
  "../src/routes/roomGroup/category/updateCategory.ts",
  "../src/routes/roomGroup/context/createGroupContext.ts",
  "../src/routes/roomGroup/context/deleteGroupContext.ts",
  "../src/routes/roomGroup/context/listGroupContext.ts",
  "../src/routes/roomGroup/context/readGroupContext.ts",
  "../src/routes/roomGroup/context/treeGroupContext.ts",
  "../src/routes/roomGroup/context/updateGroupContext.ts",
  "../src/routes/roomGroup/contextsOfType.ts",
  "../src/routes/roomGroup/group/createGroup.ts",
  "../src/routes/roomGroup/group/deleteGroup.ts",
  "../src/routes/roomGroup/group/listGroup.ts",
  "../src/routes/roomGroup/group/readGroup.ts",
  "../src/routes/roomGroup/group/updateGroup.ts",
  "../src/routes/roomGroup/groupeContextTypeList.ts",
  "../src/routes/roomGroup/interfacesGroupContexts.ts",
  "../src/routes/roomGroup/room/addRoomList.ts",
  "../src/routes/roomGroup/room/deleteRoomFromGroup.ts",
  "../src/routes/roomGroup/room/listRoom.ts",
  "../src/routes/equipementGroup/category/createCategory.ts",
  "../src/routes/equipementGroup/category/deleteCategory.ts",
  "../src/routes/equipementGroup/category/listCategory.ts",
  "../src/routes/equipementGroup/category/readCategory.ts",
  "../src/routes/equipementGroup/category/updateCategory.ts",
  "../src/routes/equipementGroup/context/createGroupContext.ts",
  "../src/routes/equipementGroup/context/deleteGroupContext.ts",
  "../src/routes/equipementGroup/context/listGroupContext.ts",
  "../src/routes/equipementGroup/context/readGroupContext.ts",
  "../src/routes/equipementGroup/context/treeGroupContext.ts",
  "../src/routes/equipementGroup/context/updateGroupContext.ts",
  "../src/routes/equipementGroup/equipement/addEquipementList.ts",
  "../src/routes/equipementGroup/equipement/deleteEquipementFromGroup.ts",
  "../src/routes/equipementGroup/equipement/equipementList.ts",
  "../src/routes/equipementGroup/group/createGroup.ts",
  "../src/routes/equipementGroup/group/deleteGroup.ts",
  "../src/routes/equipementGroup/group/listGroup.ts",
  "../src/routes/equipementGroup/group/readGroup.ts",
  "../src/routes/equipementGroup/group/updateGroup.ts",
  "../src/routes/endpointGroup/category/createCategory.ts",
  "../src/routes/endpointGroup/category/deleteCategory.ts",
  "../src/routes/endpointGroup/category/listCategory.ts",
  "../src/routes/endpointGroup/category/readCategory.ts",
  "../src/routes/endpointGroup/category/updateCategory.ts",
  "../src/routes/endpointGroup/context/createGroupContext.ts",
  "../src/routes/endpointGroup/context/deleteGroupContext.ts",
  "../src/routes/endpointGroup/context/listGroupContext.ts",
  "../src/routes/endpointGroup/context/readGroupContext.ts",
  "../src/routes/endpointGroup/context/treeGroupContext.ts",
  "../src/routes/endpointGroup/context/updateGroupContext.ts",
  "../src/routes/endpointGroup/endpoint/addEndPointList.ts",
  "../src/routes/endpointGroup/endpoint/deleteEndPointList.ts",
  "../src/routes/endpointGroup/endpoint/endpointList.ts",
  "../src/routes/endpointGroup/group/createGroup.ts",
  "../src/routes/endpointGroup/group/deleteGroup.ts",
  "../src/routes/endpointGroup/group/listGroup.ts",
  "../src/routes/endpointGroup/group/readGroup.ts",
  "../src/routes/endpointGroup/group/updateGroup.ts",
  "../src/routes/nomenclatureGroup/category/createCategoryNomenclature.ts",
  "../src/routes/nomenclatureGroup/category/deleteCategoryNomenclature.ts",
  "../src/routes/nomenclatureGroup/category/listCategoryNomenclature.ts",
  "../src/routes/nomenclatureGroup/category/readCategoryNomenclature.ts",
  "../src/routes/nomenclatureGroup/category/updateCategoryNomenclature.ts",
  "../src/routes/nomenclatureGroup/context/createNomenclatureContext.ts",
  "../src/routes/nomenclatureGroup/context/deleteNomenclatureContext.ts",
  "../src/routes/nomenclatureGroup/context/listContextNomenclature.ts",
  "../src/routes/nomenclatureGroup/context/readNomenclatureContext.ts",
  "../src/routes/nomenclatureGroup/context/treeNomenclatureContext.ts",
  "../src/routes/nomenclatureGroup/context/updateNomenclatureContext.ts",
  "../src/routes/nomenclatureGroup/group/createGroupNomenclature.ts",
  "../src/routes/nomenclatureGroup/group/deleteGroupNomenclature.ts",
  "../src/routes/nomenclatureGroup/group/listGroupNomenclature.ts",
  "../src/routes/nomenclatureGroup/group/readGroupNomenclature.ts",
  "../src/routes/nomenclatureGroup/group/updateGroupNomenclature.ts",
  "../src/routes/nomenclatureGroup/interfacesGroupContexts.ts",
  "../src/routes/nomenclatureGroup/nomenclature/createNomenclatureProfile.ts",
  "../src/routes/nomenclatureGroup/nomenclature/deleteNomenclatureProfile.ts",
  "../src/routes/nomenclatureGroup/nomenclature/listProfiles.ts",
  "../src/routes/nomenclatureGroup/nomenclature/readNomenclatureProfile.ts",
  "../src/routes/nomenclatureGroup/nomenclature/updateNomenclatureProfile.ts",
  "../src/routes/analytics/roomResume.ts",
  "../src/routes/BIM/BimObjectUtils.ts",
  "../src/routes/BIM/bimFileContext.ts",
  "../src/routes/BIM/getBimObjectsInfo.ts",
  "../src/routes/BIM/scenes/default.ts",
  "../src/routes/BIM/scenes/interfaces.ts",
  "../src/routes/BIM/scenes/item.ts",
  "../src/routes/BIM/scenes/list.ts",
  "../src/routes/BIM/scenes/sceneUtils.ts",
  "../src/routes/BIM/viewer/viewer.ts"
]