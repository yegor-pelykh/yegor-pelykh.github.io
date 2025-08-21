export abstract class HelpersUtil {
  static readonly cvFavicon: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA6RJREFUWIWtl11oU2ccxn9vzkniR0oU+xGN7YqRdQ3uo9OqbcrasW5Uqth1w82xtaVsyujo3YToLnZTV4RduFHBXjk7ZGwLG+KmG0wUnKwFodDSgjBwq8PFxTQmsaYmOe8uYrqmy0lymj5w4Jz3/N/n+Z33IzlHkF8twGtARQG1+RQBrgIjgAQQuardbvfR6enpAVVVNavVmiw2PZFImGKxmFJaWno+EAjsz1dvUhQl7PF4ZCQSkSshTdNkf3+/fPz0dQCmHACVyWSypLOzE5vNVuzDAyCEoKurK325DUBdGgo0AnagDGBsbIzh4WHDYU6nk6amJux2e0a7qi5EmjNuKIpyCIiRGp4VORwOhxwdHc2YhvHx8fT93sUjUAly6IXdW9QBbxurV2XCLUd3/BEOH/mWnp5upqamdevSAA3JpKYeP7oHT3110eFp9fU0cmzwEn6/n4qK7Ls4vQhtALY1lhULB7CttQIQjUZ1a5YuwgXdD8e4N/tg4XqTw84qq275spXVUdMkWxsGCQT/A2hvreXCSC8AAyd/4c/boayGe16qoaNtW/EAgeADXm5+ktf3Ps2JoSvcDaSGUUqJ78IEt2aCWQ1tay3FA6T1rHsjh97ezRdf3yAeT/0SCyG47DtMcHYua5/Nm9YVHJ4X4OerNwl/6OP3W/eocqaMpZS4dg0SDGUHOPhqHedOvVUcgKIIPPXVTN30M/NXaq7T21MIwZmTb3Dnbjir4c66qoLDdQGEEFw736fbad8rbkMhhgEAvrs4yakz1w2ZWcwKn368j6e2lhcPEI7EmA09NASgKIL5+YShProA3Qd20H1ghyGz5UgX4PTIb5wYumLIzGJWOPv5m9Q/V1k8wOaNdrY/4zQEYDIJNqxfY6iPLkB7ay3trbWGzJYjXYBPPrvMscFLSCkLNrNaVH766j2aG7YUD9DS6OJIX0vBRpCaghpXmaE+ugC7nq/CUV5ibASsKo7ykpw1kUgkfRrNCeA9/qPhXQBw8dy7tL1Yk9E2OTlJKBRibm4Or9eLEOKRlPJ6ToDegztxVW8wFC6EoGH7E/9r7+joWFzzSFXVD+Lx+O2cADWuMsPzmUMfAf8A96WUv6bDFwMkABJJbaUCWeL3JfBHtpr0S+kEwNlvbhhadLkUic7j+2ECIUQImNGrW/g4Xb9u9fezoYf7FcU0r5iEsX+ULEokNaumScVsNr0fj2un8wI8Pn8HaAZy76XC9DfgI/U5rqt/AYBug6tqCTZbAAAAAElFTkSuQmCC';

  static getUniqueId(baseName: string): string {
    return `${baseName}${this.#getUniqueSuffix(2)}`;
  }

  static #getUniqueSuffix(parts: number): string {
    const stringArr: string[] = [];
    for (let i = 0; i < parts; i++) {
      const s4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(s4);
    }
    return stringArr.join('-');
  }
}
