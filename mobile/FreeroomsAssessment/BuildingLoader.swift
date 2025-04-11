//
//  BuildingLoader.swift
//  FreeroomsAssessment
//
//  Created by Anh Nguyen on 31/1/2025.
//

import Foundation

public class BuildingLoader {
    private var client: HttpClient
    private var url: URL

    public enum Error: Swift.Error {
        case connectivity, invalidData
    }

    public typealias Result = Swift.Result<[Building], Swift.Error>

    public init(client: HttpClient, url: URL) {
        self.client = client
        self.url = url
    }

    public func fetchBuildings() async -> Result  {
        switch await client.get(from: url) {
        case .success(let data):
            guard let remoteBuildings = try? JSONDecoder().decode([RemoteBuilding].self, from: data.0), data.1.statusCode == 200 else {
                return .failure(Error.invalidData)
            }
            
            var buildings = [Building]()
            for remoteBuilding in remoteBuildings {
                buildings.append(Building(
                    name: remoteBuilding.building_name,
                    id: remoteBuilding.building_id.uuidString,
                    latitude: remoteBuilding.building_latitude,
                    longitude: remoteBuilding.building_longitude,
                    aliases: remoteBuilding.building_aliases)
                )
            }

            return .success(buildings)
        case .failure(_):
            return .failure(Error.connectivity)
        }

    }
}
