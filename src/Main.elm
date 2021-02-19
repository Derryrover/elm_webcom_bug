module Main exposing (..)

import Browser
import Html
import Html.Attributes
import Html.Events
import Json.Decode

main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }

type alias Model =
    { request : Bool
    , received: Bool
    , receivedDummie: Bool
    }

init : Model
init = { request = False
       , received = False 
       , receivedDummie = False
       }


type Msg
    = Request
    | Reset
    | WebcomponentEvent
    | WebcomponentEventClick
    | WebcomponentDummieClick


update : Msg -> Model -> Model
update msg model =
    case msg of
        WebcomponentEvent ->
            { model | received = True}
        WebcomponentEventClick -> 
            { model | received = True}
        WebcomponentDummieClick ->
            { model | receivedDummie = True}
        Request ->
            { model | request = True }
        Reset -> 
            { model | request = False , received = False, receivedDummie = False}
        


view : Model -> Html.Html Msg
view model =
    Html.div []
        [ Html.button [Html.Events.onClick Request] [Html.text "Request"]
        , Html.div 
            [] 
            [ Html.text "requested:"
            , Html.text (if model.request then "true" else "false")
            ]
        , Html.div 
            [] 
            [ Html.text "received:"
            , Html.text (if model.received then "true" else "false")
            ]
        , Html.div 
            [] 
            [ Html.text "received dummie:"
            , Html.text (if model.receivedDummie then "true" else "false")
            ]
        , Html.button [Html.Events.onClick Reset] [Html.text "Reset"]
        , Html.node "webcomponent-test" 
            [ Html.Events.on "created" (Json.Decode.succeed WebcomponentEvent) 
            , Html.Attributes.attribute "requeststate" (if model.request == True then "requested" else "idle")
            ] []
        , Html.node "webcomponent-click" 
            [ Html.Events.on "created" (Json.Decode.succeed WebcomponentEventClick) 
            ] []
        , Html.node "webcomponent-dummie-click" 
            [ Html.Events.on "created" (Json.Decode.succeed WebcomponentDummieClick) 
            , Html.Attributes.attribute "requeststate" (if model.request == True then "requested" else "idle")
            ] []
        ]
